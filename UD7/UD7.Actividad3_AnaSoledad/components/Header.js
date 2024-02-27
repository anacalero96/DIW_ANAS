export default {
    name: "Cabecera",
    template: `
    <nav id="nav_principal">
        <div class="container">
            <div class="row">
                <div class="col-6 col-sm-6">
                    <img class="img_logo" src="./img/LOGO.png">
                </div>
                <div class="col-5 col-sm-5 d-grid gap-2 d-md-flex justify-content-md-end">
                    <button class="btn me-md-2" type="submit"><span class="material-symbols-outlined md-18 m-1" style="vertical-align: middle;">help</span>Help</button>
                    <button class="btn " type="submit"><span class="material-symbols-outlined md-18 m-1" style="vertical-align: middle;">account_circle</span>Sign in</button>
                </div>
            </div>
        </div>
    </nav>

    <nav id="fondo" class="navbar navbar-expand-lg">
        <div class="container">
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="material-symbols-outlined" style="background-color:rgb(222, 180, 231) ;">menu</span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a class="nav-link" aria-current="page" href="#">HOME</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">FASHION</a>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">LIVING</a>
                        <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <li><a class="dropdown-item" href="#">ART</a></li>
                        <li><a class="dropdown-item" href="#">INTERVIEW</a></li>
                        <li><a class="dropdown-item" href="#">SHOPPING</a></li>
                        <li><a class="dropdown-item" href="#">GASTRONOMY </a></li>
                        <li><hr class="dropdown-divider"></li>
                        <li><a class="dropdown-item" href="#">OTHER ARTICLES</a></li>
                        </ul>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">BUSINESS</a>
                    </li>
                </ul>
                <form class="d-flex" role="search">
                     <div class="input-group">
                        <input type="text" class="form-control " placeholder="Search" aria-label="Search" aria-describedby="button-addon2"style="vertical-align: middle;">   
                        <button class="btn_search" type="button" id="button-addon2"><span class="material-symbols-outlined md-15" style="vertical-align: middle;">search</span> Search</button>
                    </div>
                </form>
            </div>
        </div>
    </nav> `,
}