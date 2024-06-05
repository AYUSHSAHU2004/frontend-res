"use client"
import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box } from "@mui/material";
import { items } from "@/app/data";

export default function SideAccordion() {
  const [expanded, setExpanded] = React.useState<string | false>(false);
1
  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };
  return (
    <div>
      {items.map((item) => {
        return (
          <Accordion
            key={item.id}
            style={{
              backgroundColor: "transparent",
              boxShadow: "none",
            }}
            expanded={expanded === "panel" + item.id}
            onChange={handleChange("panel" + item.id)}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={"panel" + item.id + "a-content"}
              id={"panel" + item.id + "a-header"}
              style={{
                transition: "none",
                border: "none",
              }}
            >
              <Box width={"14rem"} sx={{ fontWeight: "Bold" }}>
                <Typography
                  sx={{ fontWeight: "bold" }}
                  border={"none"}
                  align="left"
                  variant="h6"
                >
                  {item.name}
                </Typography>
              </Box>
            </AccordionSummary>

            <AccordionDetails
              style={{
                textAlign: "left",
                paddingLeft: "2rem",
                backgroundColor: "transparent",
                border: "none",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                }}
              >
                {/* {item.subOptions.map((subitem, index) => {
                  return (
                    <Link
                      key={index}
                      style={{
                        textDecoration: "none",
                        fontSize: "1.2rem",
                        color: "black",
                        textDecorationLine: "underline",
                        textDecorationColor: "rgb(234, 233, 224)",
                      }}
                      href={subitem.link}
                    >
                      {subitem.name}
                    </Link>
                  );
                })} */}
              </Box>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </div>
  );
}
