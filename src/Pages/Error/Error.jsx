import React from "react";

const Error = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-100">
      <img
        className="max-w-4xl w-full"
        src="https://imgs.search.brave.com/mvyY4gagV2ExpL4eo1rSzlDXle170QN2oZLb5RrhhDY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/dmVjdG9yc3RvY2su/Y29tL2kvNTAwcC81/My8yNy80MDQtcGFn/ZS1ub3QtZm91bmQt/ZXJyb3ItYWNjZXNz/LWZhaWx1cmUtdmVj/dG9yLTQ2NTM1MzI3/LmpwZw"
        alt="Error 404"
      />
      <h1 className="text-6xl font-bold mt-6 text-red-600">Error</h1>
      <p className="text-xl mt-2 text-gray-500">Page not found!</p>
    </div>
  );
};

export default Error;
