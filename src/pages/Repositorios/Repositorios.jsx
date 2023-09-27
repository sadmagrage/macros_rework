import './Repositorios.css';

export function Repositorios () {
    return (
        <div className='repositorios'>
            <a className='repositorio' href='https://github.com/sadmagrage/macros_rework' target='_blank' >
                <h3>Repositório das páginas</h3>
                <p>Link do repositório GitHub da construção das páginas em ReactJS</p>
            </a>
            <a className='repositorio' href='https://github.com/sadmagrage/macros_rework_api' target='_blank' >
                <h3>Repositório da API</h3>
                <p>Link do repositório GitHub da API em NodeJS</p>
            </a>
        </div>
    )
}