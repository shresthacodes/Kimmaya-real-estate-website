import { useEffect, useState } from "react";

const useHeaderColor = () => {
  // Initialize with transparent or a default color
  const [headerColor, setHeaderColor] = useState("transparent");

  useEffect(() => {
    function handleScroll() {
      // Set color based on scroll position
      if (window.scrollY > 8) {
        setHeaderColor("transparent"); // Change color after scrolling
      } else {
        setHeaderColor("transparent"); // Keep transparent when at the top
      }
    }

    // Attach event listener
    window.addEventListener("scroll", handleScroll);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return headerColor;
};

export default useHeaderColor;
