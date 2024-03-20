function Footer() {
  return (
    <>
      <div className="app-wrapper-footer">
        <div className="app-footer">
          <div className="app-footer__inner">
            <div className="app-footer-right">
              <ul className="header-megamenu nav">
                <li className="nav-item">
                  © 2020 Brajasundara Dāsa. All Rights Reserved.
                  <div className="rm-max-width rm-pointers">
                    <div className="d-none popover-custom-content">
                      <div className="dropdown-mega-menu dropdown-mega-menu-sm">
                        <div className="grid-menu grid-menu-2col">
                          <div className="no-gutters row">
                            <div className="col-sm-6 col-xl-6">
                              <ul className="nav flex-column">
                                <li className="nav-item-header nav-item">
                                  Overview
                                </li>
                                <li className="nav-item">
                                  <a className="nav-link">
                                    <i className="nav-link-icon lnr-inbox" />
                                    <span>Contacts</span>
                                  </a>
                                </li>
                                <li className="nav-item">
                                  <a className="nav-link">
                                    <i className="nav-link-icon lnr-book" />
                                    <span>Incidents</span>
                                    <div className="ml-auto badge badge-pill badge-danger">
                                      5
                                    </div>
                                  </a>
                                </li>
                                <li className="nav-item">
                                  <a className="nav-link">
                                    <i className="nav-link-icon lnr-picture" />
                                    <span>Companies</span>
                                  </a>
                                </li>
                                <li className="nav-item">
                                  <a disabled className="nav-link disabled">
                                    <i className="nav-link-icon lnr-file-empty" />
                                    <span>Dashboards</span>
                                  </a>
                                </li>
                              </ul>
                            </div>
                            <div className="col-sm-6 col-xl-6">
                              <ul className="nav flex-column">
                                <li className="nav-item-header nav-item">
                                  Sales &amp; Marketing
                                </li>
                                <li className="nav-item">
                                  <a className="nav-link">Queues</a>
                                </li>
                                <li className="nav-item">
                                  <a className="nav-link">Resource Groups</a>
                                </li>
                                <li className="nav-item">
                                  <a className="nav-link">
                                    Goal Metrics
                                    <div className="ml-auto badge badge-warning">
                                      3
                                    </div>
                                  </a>
                                </li>
                                <li className="nav-item">
                                  <a className="nav-link">Campaigns</a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
