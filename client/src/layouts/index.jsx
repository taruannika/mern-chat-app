export default function AuthLayouts({ children }) {
  return (
    <>
      <header className="bg-white shadow-md h-20 flex justify-center items-center">
        This is header
      </header>

      {children}
    </>
  );
}
