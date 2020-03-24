USE redFenomenosParanormales;

INSERT IGNORE INTO investigadores VALUES (1, 'Federico', 'Fernández López', '79a4ab4af9f82358353d668a46f6f9aa', '56729832U', '899134333', 'FedFerLop@gmail.com', 'Huesca');
INSERT IGNORE INTO investigadores VALUES (2, 'María', 'Rueda Perea', '79a4ab4af9f82358353d668a46f6f9aa', '67123231H', '812367222', 'MarRuePer@gmail.com', 'Madrid');
INSERT IGNORE INTO investigadores VALUES (3, 'Yolanda', 'Silva Romero', '79a4ab4af9f82358353d668a46f6f9aa', '45628909B', '678111021', 'YolSilRom@gmail.com', 'Bilbao');
INSERT IGNORE INTO investigadores VALUES (4, 'Rodrigo', 'Zambrano Rodriguez', '79a4ab4af9f82358353d668a46f6f9aa', '43210987D', '998765123', 'RodZamRod@gmail.com', 'Barcelona');

INSERT IGNORE INTO estados VALUES (1, 'En investigación');
INSERT IGNORE INTO estados VALUES (2, 'Demostrado');
INSERT IGNORE INTO estados VALUES (3, 'Sin explicación');
INSERT IGNORE INTO estados VALUES (4, 'Para archivar');

INSERT IGNORE INTO fenomenosParanormales VALUES (1, 2, 'Movimiento extraño de una persiana en un lugar sin apenas viento. La persiana subía y bajaba sin motivo aparente.', '2019-09-07', 'Alquézar', 'Huesca', 'Aragón', 1);
INSERT IGNORE INTO fenomenosParanormales VALUES (2, 4, 'Sonidos extraños en un hospital abandonado durante el día, intensificados cuando llegan las 2 de la mañana.', '2019-10-04', 'Alarcón', 'Cuenca', 'Castilla-La Mancha', 2);
INSERT IGNORE INTO fenomenosParanormales VALUES (3, 1, 'Aullidos en una zona desierta, sin animales alrededor.', '2020-01-05', 'Mojácar', 'Almería', 'Andalucía', 3);
INSERT IGNORE INTO fenomenosParanormales VALUES (4, 1, 'Aparición de manchas de sangre en una casa deshabitada desde hace 20 años.', '2020-03-09', 'Pedraza', 'Segovia', 'Castilla y León', 4);

INSERT IGNORE INTO archivo VALUES (1, 1, 'La mujer invisible no resultó ser más que una sabana bastante vieja que no se veía a simple vista.', '2019-11-30', 'Alcalá del Río');