CREATE TABLE tb_fluxo_caixa(
    id SERIAL PRIMARY KEY,
    Data DATE not null,
    Valor MONEY not null,
    Descricao VARCHAR(150) not null,
    Tipo VARCHAR(10) not null
);








