'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">ar-anda-lite documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-AppModule-a3a93d82168004cc836c9d965b589baf31bf91aa39e84f5ccff6bd76e7941709ed4be383850ea86a332002ffc34e7ba7adc973c315d1678d5ba8a90f0dd78829"' : 'data-bs-target="#xs-components-links-module-AppModule-a3a93d82168004cc836c9d965b589baf31bf91aa39e84f5ccff6bd76e7941709ed4be383850ea86a332002ffc34e7ba7adc973c315d1678d5ba8a90f0dd78829"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-a3a93d82168004cc836c9d965b589baf31bf91aa39e84f5ccff6bd76e7941709ed4be383850ea86a332002ffc34e7ba7adc973c315d1678d5ba8a90f0dd78829"' :
                                            'id="xs-components-links-module-AppModule-a3a93d82168004cc836c9d965b589baf31bf91aa39e84f5ccff6bd76e7941709ed4be383850ea86a332002ffc34e7ba7adc973c315d1678d5ba8a90f0dd78829"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link" >AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-AuthModule-f53f8416be5f56e8e76ad6eb922346004125647ebf2c98ca038037cd9e69c6fa3f39d8f0f598bf76f495a788043285fa18cea3d11c858d39bd31bac30b9dbc2a"' : 'data-bs-target="#xs-components-links-module-AuthModule-f53f8416be5f56e8e76ad6eb922346004125647ebf2c98ca038037cd9e69c6fa3f39d8f0f598bf76f495a788043285fa18cea3d11c858d39bd31bac30b9dbc2a"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AuthModule-f53f8416be5f56e8e76ad6eb922346004125647ebf2c98ca038037cd9e69c6fa3f39d8f0f598bf76f495a788043285fa18cea3d11c858d39bd31bac30b9dbc2a"' :
                                            'id="xs-components-links-module-AuthModule-f53f8416be5f56e8e76ad6eb922346004125647ebf2c98ca038037cd9e69c6fa3f39d8f0f598bf76f495a788043285fa18cea3d11c858d39bd31bac30b9dbc2a"' }>
                                            <li class="link">
                                                <a href="components/RegisterComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RegisterComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/DashboardModule.html" data-type="entity-link" >DashboardModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-DashboardModule-7e54a8957eadeee6582c8167aad528626ea64e10f14b7dc4e97a3e0cb7aff3fcdf76942836f0cc3d409e8661b2ee2d656a7d67f253878c37d187c3b5dd1ef610"' : 'data-bs-target="#xs-components-links-module-DashboardModule-7e54a8957eadeee6582c8167aad528626ea64e10f14b7dc4e97a3e0cb7aff3fcdf76942836f0cc3d409e8661b2ee2d656a7d67f253878c37d187c3b5dd1ef610"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-DashboardModule-7e54a8957eadeee6582c8167aad528626ea64e10f14b7dc4e97a3e0cb7aff3fcdf76942836f0cc3d409e8661b2ee2d656a7d67f253878c37d187c3b5dd1ef610"' :
                                            'id="xs-components-links-module-DashboardModule-7e54a8957eadeee6582c8167aad528626ea64e10f14b7dc4e97a3e0cb7aff3fcdf76942836f0cc3d409e8661b2ee2d656a7d67f253878c37d187c3b5dd1ef610"' }>
                                            <li class="link">
                                                <a href="components/BottomNavigationComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BottomNavigationComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DashboardComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DashboardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProfileHeaderComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProfileHeaderComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProfileSectionsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProfileSectionsComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/LoginModule.html" data-type="entity-link" >LoginModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/LoginRoutingModule.html" data-type="entity-link" >LoginRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/RegisterModule.html" data-type="entity-link" >RegisterModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/RegisterRoutingModule.html" data-type="entity-link" >RegisterRoutingModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#components-links"' :
                            'data-bs-target="#xs-components-links"' }>
                            <span class="icon ion-md-cog"></span>
                            <span>Components</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="components-links"' : 'id="xs-components-links"' }>
                            <li class="link">
                                <a href="components/ArandaComponent.html" data-type="entity-link" >ArandaComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/AratisComponent.html" data-type="entity-link" >AratisComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ArComponent.html" data-type="entity-link" >ArComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/CategoriasComponent.html" data-type="entity-link" >CategoriasComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ComponentsComponent.html" data-type="entity-link" >ComponentsComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/EventsCarouselComponent.html" data-type="entity-link" >EventsCarouselComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/HistoriasComponent.html" data-type="entity-link" >HistoriasComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/HomeComponent.html" data-type="entity-link" >HomeComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/LoginComponent.html" data-type="entity-link" >LoginComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/MapComponent.html" data-type="entity-link" >MapComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/MenuCarouselComponent.html" data-type="entity-link" >MenuCarouselComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/MenuComponent.html" data-type="entity-link" >MenuComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/NavbarComponent.html" data-type="entity-link" >NavbarComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/NavigationFooterComponent.html" data-type="entity-link" >NavigationFooterComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/OsejaComponent.html" data-type="entity-link" >OsejaComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/PlacesCarouselComponent.html" data-type="entity-link" >PlacesCarouselComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/PoiMapComponent.html" data-type="entity-link" >PoiMapComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/RegisterSuccesComponent.html" data-type="entity-link" >RegisterSuccesComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/RutasCarouselComponent.html" data-type="entity-link" >RutasCarouselComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/SharedComponent.html" data-type="entity-link" >SharedComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/StartComponent.html" data-type="entity-link" >StartComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TiergaComponent.html" data-type="entity-link" >TiergaComponent</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DashboardService.html" data-type="entity-link" >DashboardService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#guards-links"' :
                            'data-bs-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AuthGuard.html" data-type="entity-link" >AuthGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/MenuItem.html" data-type="entity-link" >MenuItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PointOfInterest.html" data-type="entity-link" >PointOfInterest</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RegistrationResponse.html" data-type="entity-link" >RegistrationResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RegistrationResponse-1.html" data-type="entity-link" >RegistrationResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/User.html" data-type="entity-link" >User</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/User-1.html" data-type="entity-link" >User</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserRegistration.html" data-type="entity-link" >UserRegistration</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserRegistration-1.html" data-type="entity-link" >UserRegistration</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});