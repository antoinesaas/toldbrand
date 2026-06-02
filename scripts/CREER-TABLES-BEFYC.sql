-- =============================================================================
-- TOLD Brand — À exécuter sur le projet Supabase BEFYC (pas "totalbread")
-- =============================================================================
-- Le site toldbrand.fr utilise : https://befyczgottbemittzpop.supabase.co
--
-- 1. Ouvrir : https://supabase.com/dashboard/project/befyczgottbemittzpop/sql/new
-- 2. Coller tout ce fichier → Run
-- 3. Table Editor : vous devez voir "orders" et "order_items"
-- =============================================================================

CREATE TYPE public.order_status AS ENUM (
  'pending',
  'paid',
  'processing',
  'in_production',
  'shipped',
  'delivered',
  'cancelled',
  'failed'
);

CREATE TABLE IF NOT EXISTS public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  stripe_session_id TEXT UNIQUE NOT NULL,
  gelato_order_id TEXT,
  customer_email TEXT NOT NULL,
  status public.order_status NOT NULL DEFAULT 'pending',
  gelato_status TEXT,
  currency TEXT NOT NULL DEFAULT 'EUR',
  total_cents INTEGER NOT NULL DEFAULT 0,
  shipping_name TEXT,
  shipping_address JSONB,
  tracking_url TEXT,
  tracking_number TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id TEXT NOT NULL,
  product_name TEXT NOT NULL,
  variant_label TEXT,
  size TEXT NOT NULL,
  color TEXT NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  unit_price_cents INTEGER NOT NULL,
  image_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS orders_user_id_idx ON public.orders(user_id);
CREATE INDEX IF NOT EXISTS orders_customer_email_idx ON public.orders(customer_email);
CREATE INDEX IF NOT EXISTS orders_gelato_order_id_idx ON public.orders(gelato_order_id);
CREATE INDEX IF NOT EXISTS order_items_order_id_idx ON public.order_items(order_id);

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS orders_updated_at ON public.orders;
CREATE TRIGGER orders_updated_at
  BEFORE UPDATE ON public.orders
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users read own orders" ON public.orders;
CREATE POLICY "Users read own orders"
  ON public.orders FOR SELECT
  USING (auth.uid() = user_id OR lower(customer_email) = lower(auth.jwt() ->> 'email'));

DROP POLICY IF EXISTS "Users read own order items" ON public.order_items;
CREATE POLICY "Users read own order items"
  ON public.order_items FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.orders o
      WHERE o.id = order_items.order_id
      AND (o.user_id = auth.uid() OR lower(o.customer_email) = lower(auth.jwt() ->> 'email'))
    )
  );

CREATE OR REPLACE FUNCTION public.link_orders_to_user()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.orders
  SET user_id = NEW.id
  WHERE user_id IS NULL AND lower(customer_email) = lower(NEW.email);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_link_orders ON auth.users;
CREATE TRIGGER on_auth_user_link_orders
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.link_orders_to_user();

-- Obligatoire : rafraîchir l’API REST (sinon erreur « schema cache » sur toldbrand.fr)
NOTIFY pgrst, 'reload schema';
