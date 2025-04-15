import React from 'react';

function Footer() {
  return (
    <footer className="main-footer">
      <div className="float-right d-none d-sm-block">
        <b>版本</b> 1.0.0
      </div>
      <strong>Copyright &copy; {new Date().getFullYear()} <a href="#">待辦事項清單</a>.</strong> 保留所有權利。
    </footer>
  );
}

export default Footer;
