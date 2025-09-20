// src/Components/ApplicationLogo.jsx

export default function ApplicationLogo(props) {
  return (
    <img
      {...props}
      src="https://ik.imagekit.io/vutfc4tgw/HiveNet.png?updatedAt=1758306288404"
      alt="HiveNet Logo"
      className="h-9 w-auto z-30" // z-index added to bring it to the front
    />
  );
}
