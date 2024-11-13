export const renderSentence = (sentence) => {
  const parts = sentence.split(/(\(.*?\)|".*?")/g);

  return parts.map((part, index) => {
    if (part.startsWith("(") && part.endsWith(")")) {
      return (
        <span key={index} className="font-semibold">
          {part}
        </span>
      );
    } else if (part.startsWith('"') && part.endsWith('"')) {
      return (
        <span key={index} className="italic">
          {part}
        </span>
      );
    } else if (
      part.includes(":") &&
      !part.startsWith("(") &&
      !part.startsWith('"')
    ) {
      const [beforeColon, afterColon] = part.split(/:(.+)/);
      return (
        <span key={index}>
          <span className="font-semibold">{beforeColon}:</span>
          {afterColon}
        </span>
      );
    } else {
      return part;
    }
  });
};

export const formatGrade = (grade) => {
  if (grade !== null) {
    const roundedGrade = grade.toFixed(1);
    return roundedGrade;
  } else {
    return "Pendiente";
  }
};
