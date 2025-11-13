import React, { useState, useEffect } from 'react';
import './modalEdicao.css';

function ModalEdicao({ filme, aoFechar, aoSalvar, erro }) {
    
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (filme) {
            setFormData({
                id_filme: filme.id_filme || '',
                titulo: filme.titulo || '',
                ano: filme.ano || '',
                poster: filme.poster || '',
                elenco: filme.elenco || '',
                sinopse: filme.sinopse || '',
                diretor_nome: filme.diretor_nome || 'N/A',
                generos: filme.generos || 'N/A'
            });
        }
    }, [filme]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        await aoSalvar(formData);
        setLoading(false);
    };

    if (!filme) return null;

    return (
        <div className="modalOverlay" onClick={aoFechar}>
            <div className="modalConteudo" onClick={(e) => e.stopPropagation()}>
                <form className="modalForm" onSubmit={handleSubmit}>
                    <h2 className="tituloFormulario">Editar Filme</h2>
                    
                    <label htmlFor="titulo" className="rotulo">Título:</label>
                    <input
                        type="text"
                        id="titulo"
                        name="titulo"
                        className="campo"
                        value={formData.titulo}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="ano" className="rotulo">Ano:</label>
                    <input
                        type="number"
                        id="ano"
                        name="ano"
                        className="campo"
                        value={formData.ano}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="poster" className="rotulo">URL do Pôster:</label>
                    <input
                        type="url"
                        id="poster"
                        name="poster"
                        className="campo"
                        value={formData.poster}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="elenco" className="rotulo">Elenco (separado por vírgula):</label>
                    <input
                        type="text"
                        id="elenco"
                        name="elenco"
                        className="campo"
                        value={formData.elenco}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="sinopse" className="rotulo">Sinopse:</label>
                    <textarea
                        id="sinopse"
                        name="sinopse"
                        className="campoArea"
                        value={formData.sinopse}
                        onChange={handleChange}
                        required
                    ></textarea>
                    
                    <div className="campoReadOnly">
                        <strong>Diretor:</strong> {formData.diretor_nome}
                    </div>
                    <div className="campoReadOnly">
                        <strong>Gêneros:</strong> {formData.generos}
                    </div>

                    {erro && <p className="formErro">{erro}</p>}

                    <div className="modalBotoes">
                        <button type="button" className="botaoAcao recusar" onClick={aoFechar} disabled={loading}>
                            Cancelar
                        </button>
                        <button type="submit" className="botaoAcao aprovar" disabled={loading}>
                            {loading ? 'Salvando...' : 'Salvar Alterações'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ModalEdicao;