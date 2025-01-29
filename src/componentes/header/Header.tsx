import {Link} from 'react-router-dom';
function Header(){
    return(
        <header className="site-header">
        
        
                <nav className="navigation">
                  <ul>
                    <Link to="/">Home</Link>
                    <Link to="/cadastro-produto">Cadastro de Produto</Link>
                  </ul>
                </nav>
        
          
              </header>
    )
}

export default Header;