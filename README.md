# Queries

SELECT name FROM band WHERE id = (SELECT band_id FROM album WHERE album_type_id = 1)

# TODO