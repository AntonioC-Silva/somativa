import React, { useState, useEffect, useRef } from 'react';
import './modalEdicao.css';

// 1. Recebe 'loading' como prop
function ModalEdicao({ filme, aoFechar, aoSalvar, erro, loading }) {
    
    const [formData, setFormData] = useState({});
    // 2. Remove o state de loading interno
    // const [loading, setLoading] = useState(false); 
    const modalRef = useRef(null);

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

    // Efeito de acessibilidade (Focus Trap e 'Esc')
    useEffect(() => {
        if (!filme || !modalRef.current) return;
        const modalNode = modalRef.current;
        
        const focusableElements = modalNode.querySelectorAll(
            'input, textarea, button'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        firstElement?.focus();

        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                aoFechar();
                return;
            }
            if (e.key !== 'Tab') return;
            if (e.shiftKey) { 
                if (document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement?.focus();
                }
            } else { 
                if (document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement?.focus();
                }
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [filme, aoFechar]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // 3. A função pai (aoSalvar) agora controla o loading
        await aoSalvar(formData);
    };

    if (!filme) return null;

    return (
        <div className="modalOverlay" onClick={aoFechar}>
            <div 
                className="modalConteudo" 
                onClick={(e) => e.stopPropagation()} 
                ref={modalRef}
                role="dialog" 
                aria-modal="true" 
                aria-labelledby="modal-titulo"
            >
                <form className="modalForm" onSubmit={handleSubmit}>
                    <h2 className="tituloFormulario" id="modal-titulo">Editar Filme</h2>
                    
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
                        <button typea="button" className="botaoAcao recusar" onClick={aoFechar} disabled={loading}>
                            Cancelar
                        </button>
                        <button type="submit" className="botaoAcao aprovar" disabled={loading}>
                            {/* 4. Usa o prop 'loading' */}
                            {loading ? 'Enviando...' : 'Salvar Alterações'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ModalEdicao;