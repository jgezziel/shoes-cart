const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <footer className="py-4 mt-6 border-t border-t-zinc-200">
      <div className="container text-center">
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Desarrollado por
          <span className="font-bold"> Jhosmar Balan (jgezziel)</span>
        </p>
        <p className="text-sm text-zinc-400 dark:text-zinc-500">
          &copy; {year}. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
