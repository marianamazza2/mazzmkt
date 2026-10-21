const statsData = [
  { number: "10+", label: "PROYECTOS" },
  { number: "100%", label: "SATISFACCIÓN" },
  { number: "5+", label: "PAÍSES" },
  { number: "24H", label: "RESPUESTA" },
];

export function Stats() {
  return (
    <div
      className="md:hidden"
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "0.5px",
        background: "rgba(44, 44, 44, 0.06)",
      }}
    >
      {statsData.map(({ number, label }) => (
        <div
          key={label}
          className="p-5 text-center"
          style={{ background: "#ffffff" }}
        >
          <div
            className="font-medium"
            style={{ fontSize: "28px", letterSpacing: "-1px", color: "#0a0a0a" }}
          >
            {number}
          </div>
          <div
            className="uppercase mt-[2px]"
            style={{ fontSize: "10px", letterSpacing: "1.5px", color: "#878787" }}
          >
            {label}
          </div>
        </div>
      ))}
    </div>
  );
}
