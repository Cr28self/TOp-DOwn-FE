import { Button } from "./ui/button";

const Header = () => {
  return (
    <header className="bg-white shadow-md py-4  z-50 fixed top-0 left-0 w-full">
      <div className="container mx-auto flex justify-between items-center px-6">
        <h1 className="text-2xl font-bold text-blue-600">MyBrand</h1>
      </div>
    </header>
  );
};

export default Header;
