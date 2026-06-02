-- Après avoir créé des tables, PostgREST garde parfois un ancien cache.
-- Exécutez ceci sur befyczgottbemittzpop (SQL Editor → Run) :

NOTIFY pgrst, 'reload schema';
