import React from "react";

export default function Navbar() {
  return (
    <nav className="navbar bg-base-100 rounded-box gap-4 shadow">
      <div className="navbar-start items-center">
        <a
          className="link text-base-content link-neutral text-xl font-semibold no-underline"
          href="#"
        >
          FlyonUI
        </a>
      </div>
      <div
        id="sticky-navbar-collapse"
        class="md:navbar-end collapse hidden grow basis-full overflow-hidden transition-[height] duration-300 max-md:w-full"
      >
        <ul class="menu md:menu-horizontal gap-2 p-0 text-base max-md:mt-2">
          <li>
            <a href="#">Link 1</a>
          </li>
          <li>
            <a href="#">Link 2</a>
          </li>
        </ul>
      </div>
      <div className="navbar-end flex items-center gap-4">
        <button className="btn btn-sm btn-text btn-circle size-[2.125rem] md:hidden">
          <i className="tabler-icon tabler-search size-[1.375rem]"></i>
        </button>
        <div className="input-group hidden max-w-56 rounded-full md:flex">
          <span className="input-group-text">
            <i className="tabler-icon tabler-search text-base-content/80 size-5"></i>
          </span>
          <label className="sr-only" htmlFor="searchInput">
            Full Name
          </label>
          <input
            type="search"
            id="searchInput"
            className="input grow rounded-e-full"
            placeholder="Search"
          />
        </div>
        <div className="dropdown relative inline-flex">
          <button
            id="dropdown-scrollable"
            type="button"
            className="dropdown-toggle flex items-center"
            aria-haspopup="menu"
            aria-expanded="false"
            aria-label="Dropdown"
          >
            <div className="avatar">
              <div className="size-9.5 rounded-full">
                <img
                  src="https://cdn.flyonui.com/fy-assets/avatar/avatar-1.png"
                  alt="avatar 1"
                />
              </div>
            </div>
          </button>
          <ul
            className="dropdown-menu dropdown-open:opacity-100 hidden min-w-60"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="dropdown-avatar"
          >
            <li className="dropdown-header gap-2">
              <div className="avatar">
                <div className="w-10 rounded-full">
                  <img
                    src="https://cdn.flyonui.com/fy-assets/avatar/avatar-1.png"
                    alt="avatar"
                  />
                </div>
              </div>
              <div>
                <h6 className="text-base-content text-base font-semibold">
                  John Doe
                </h6>
                <small className="text-base-content/50">Admin</small>
              </div>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                <i className="tabler-icon tabler-user"></i>
                My Profile
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                <i className="tabler-icon tabler-settings"></i>
                Settings
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                <i className="tabler-icon tabler-receipt-rupee"></i>
                Billing
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                <i className="tabler-icon tabler-help-triangle"></i>
                FAQs
              </a>
            </li>
            <li className="dropdown-footer gap-2">
              <a className="btn btn-error btn-soft btn-block" href="#">
                <i className="tabler-icon tabler-logout"></i>
                Sign out
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
