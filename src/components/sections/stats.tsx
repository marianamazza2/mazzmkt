import { useTranslation } from "react-i18next";

export function Stats() {
  const { t } = useTranslation();
  const statsData = t("stats_home", { returnObjects: true }) as { number: string; label: string }[];

  return (
    <div
      className="md:hidden"
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "0.5px",
        background: "rgba(44, 44, 42, 0.06)",
      }}
    >
      {statsData.map(({ number, label }) => (
        <div
          key={label}
          className="p-5 text-center"
          style={{ background: "#f1ede1" }}
        >
          <div
            className="font-medium"
            style={{ fontSize: "28px", letterSpacing: "-1px", color: "#141414" }}
          >
            {number}
          </div>
          <div
            className="uppercase mt-[2px]"
            style={{ fontSize: "10px", letterSpacing: "1.5px", color: "#888780" }}
          >
            {label}
          </div>
        </div>
      ))}
    </div>
  );
}
