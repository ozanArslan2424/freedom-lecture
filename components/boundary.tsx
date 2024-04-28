export type BoundaryProps = {
  name?: string;
  color: string;
  radius: number;
};

export const Boundary = ({ name, color, radius }: BoundaryProps) => {
  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <div
        style={{
          borderWidth: "3px",
          borderStyle: "solid",
          borderColor: color,
          backgroundColor: "#f0f0f0",
          opacity: 0.7,
          width: radius * 4,
          height: radius * 4,
          borderRadius: "50%",
          aspectRatio: "1/1",
          display: "flex",
          justifyContent: "center",
          alignItems: "top",
        }}
      >
        <div
          style={{
            height: "min-content",
            fontSize: "1.5rem",
            lineHeight: "2rem",
            fontWeight: 600,
            letterSpacing: "-0.025em",
            paddingBlock: "0.5rem",
            paddingInline: "1rem",
            marginTop: "1rem",
            textTransform: "capitalize",
          }}
        >
          {name && name}
        </div>
      </div>
    </div>
  );
};

export const TopBoundary = ({ color, radius }: BoundaryProps) => {
  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <div
        style={{
          borderWidth: 3,
          borderColor: color,
          backgroundColor: "#f0f0f0",
          opacity: 0.7,
          width: radius * 4,
          height: radius * 4,
          borderRadius: "50%",
          border: "1px solid",
          aspectRatio: "1/1",
          display: "flex",
          justifyContent: "center",
          alignItems: "top",
        }}
      >
        <div
          style={{
            height: "min-content",
            fontSize: "1.5rem",
            lineHeight: "2rem",
            fontWeight: 600,
            letterSpacing: "-0.025em",
            paddingBlock: "0.5rem",
            paddingInline: "1rem",
            marginTop: "1rem",
          }}
        ></div>
      </div>
    </div>
  );
};
