# Queries

SELECT name FROM band WHERE id = (SELECT band_id FROM album WHERE album_type_id = 1)

# TODO

Måste fixa att den nya albumets som läggs till och den nya låten som läggs tills ska synas i listan utan reload