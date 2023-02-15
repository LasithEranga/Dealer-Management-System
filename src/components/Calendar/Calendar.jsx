import {
  ArrowBackIos,
  ArrowForwardIos,
  Close,
  Help,
} from "@mui/icons-material";
import { Backdrop, Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Dot from "./Dot";
import SessionInfo from "./SessionInfo";
import "./Calendar.css";

const COLOR_VIRTUAL_SESSIONS = "#56508c";
const COLOR_PHYSICAL_SESSIONS = "#fe6464";

const Calendar = ({
  availableSessions = [],
  refreshCalendar,
  setRefreshCalendar,
}) => {
  // console.log("sdhbf", availableSessions);
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "Augest",
    "September",
    "October",
    "November",
    "December",
  ];

  const [gridMonth, setMonth] = useState(new Date().getMonth());

  const [sessions, setSessions] = useState([]);

  const [avilableSessionTypes, setAvailableSessionTypes] = useState({
    virtual: false,
    physical: false,
    hybrid: false,
  });

  const [showSessions, setShowSessions] = useState(false);

  const generateDayGrid = (month = 0) => {
    //check whether the first  day is sunday
    //if not loop until the sunday meets
    //the calendar can hold upto 6 weeks maximum
    //possible combinations are saturaday is 1st date -> makes 6 weeks in one month
    //all others make the 5 weeks view
    let dayGrid = [];
    let date = new Date();
    date.setDate(1); // set the date to the first date of the month
    date.setMonth(month);
    let day = date.toDateString();
    while (day.substring(0, 3).toLowerCase() !== "sun") {
      date.setDate(date.getDate() - 1);
      day = date.toDateString();
    }

    //at this point we have the starting date of the month
    //loop until last date of the month
    let endDate = new Date(new Date().getFullYear(), month + 1, 0);
    endDate.setDate(endDate.getDate() + 1);
    while (true) {
      if (date.toDateString() === endDate.toDateString()) {
        break;
      }
      dayGrid.push({
        [date.toDateString().substring(4, 7).toLocaleLowerCase() +
        date.toDateString().substring(8, 10) +
        date.toDateString().substring(11, 15)]: {
          date: new Date(date),
          events: [],
        },
      });
      date.setDate(date.getDate() + 1);
    }

    //there should be 42 days in one daygrid view
    //filling the rest of the dates
    while (dayGrid.length < 42) {
      dayGrid.push({
        [date.toDateString().substring(4, 7).toLocaleLowerCase() +
        date.toDateString().substring(8, 10) +
        date.toDateString().substring(11, 15)]: {
          date: new Date(date),
          events: [],
        },
      });

      date.setDate(date.getDate() + 1);
    }
    // console.log(dayGrid);
    return dayGrid;
  };

  const [dayGridView, setDayGridView] = useState(() =>
    generateDayGrid(gridMonth)
  );

  const setEvent = (dateTime, session, currentDayGrid) => {
    //find the date from daygrid
    //set events 28feb
    //return the array
    console.log(currentDayGrid);
    let dayName =
      dateTime.toDateString().substring(4, 7).toLocaleLowerCase() +
      dateTime.toDateString().substring(8, 10) +
      dateTime.toDateString().substring(11, 15);

    currentDayGrid.forEach((dayView) => {
      if (Object.keys(dayView)[0] === dayName) {
        Object.values(dayView)[0].events.push({
          session: session,
        });
        // console.log(Object.values(dayView)[0].events);
      }
    });
    return currentDayGrid;
  };

  const clearAllEvents = (currentDayGrid) => {
    currentDayGrid.forEach((dayView) => {
      Object.values(dayView)[0].events = [];
    });
    return currentDayGrid;
  };

  useEffect(() => {
    setDayGridView([...generateDayGrid(gridMonth)]);
    setRefreshCalendar(true);
  }, [gridMonth]);

  useEffect(() => {
    if (refreshCalendar && availableSessions.length >= 0) {
      // console.log(dayGridView);
      const currentDayGrid = clearAllEvents(dayGridView);
      availableSessions.forEach((oneSession) => {
        const date = new Date(oneSession.TimeStart);
        const newView = setEvent(date, oneSession, currentDayGrid);
        setDayGridView([...newView]);
      });
      setRefreshCalendar(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dayGridView, availableSessions, refreshCalendar]);

  const today = new Date().toLocaleDateString(); //used to mark today

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        display={"flex"}
        justifyContent="space-between"
        mb={0.2}
        position="relative"
      >
        <Backdrop
          sx={{ backgroundColor: "transparent", opacity: 0.2 }}
          open={showSessions}
          onClick={() => {
            setShowSessions(false);
          }}
        ></Backdrop>
        <Box
          position={"absolute"}
          top={60}
          left={10}
          display={showSessions ? "unset" : "none"}
          right={10}
          sx={{ backgroundColor: "white", borderRadius: 1 }}
          width={"95%"}
          height={"16rem"}
          pt={0.7}
          px={1}
        >
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
            mb={1}
            p={1}
          >
            <Typography fontWeight={"bold"} fontSize={"1.1rem"}>
              Available Sessions{" "}
              {new Date(sessions[0]?.session.TimeStart).toLocaleDateString()}
            </Typography>
            <Button
              onClick={() => {
                setShowSessions(false);
              }}
              sx={{
                minWidth: "auto",
                padding: 0,
                color: "black",
              }}
              variant="text"
            >
              <Close />
            </Button>
          </Box>
          <Box sx={{ overflow: "auto" }} height={"10.5rem"} pr={2} pl={1}>
            <SessionInfo
              title={"Virtual Sessions"}
              sessions={sessions.filter(
                (oneEl) => oneEl.session.Type === 1 || oneEl.session.Type === 3
              )}
            />
            <SessionInfo
              title={"Physical Sessions"}
              sessions={sessions.filter(
                (oneEl) => oneEl.session.Type === 2 || oneEl.session.Type === 3
              )}
            />
          </Box>
          <Box
            display={"flex"}
            alignItems="center"
            justifyContent={"center"}
            gap={1}
          >
            <Help />
            <Typography>Select a session to continue</Typography>
          </Box>
        </Box>

        <Box display={"flex"} justifyContent="space-between" width={"100%"}>
          <div>
            <button
              className="action-btns"
              onClick={() => {
                setMonth((prev) => prev - 1);
              }}
            >
              <ArrowBackIos fontSize="0.8rem" />
            </button>
          </div>
          <div>
            <h2>
              {
                months[
                  new Date(new Date().getFullYear(), gridMonth, 1).getMonth()
                ]
              }{" "}
              {new Date(new Date().getFullYear(), gridMonth, 1).getFullYear()}
            </h2>
          </div>
          <div>
            <button
              className="action-btns"
              onClick={() => {
                setMonth((prev) => prev + 1);
              }}
            >
              <ArrowForwardIos fontSize="0.8rem" />
            </button>
          </div>
        </Box>
      </Box>
      <table collapse="collapse" className="tableStyle">
        <thead>
          <tr>
            {days.map((day, index) => {
              return <th key={index}>{day}</th>;
            })}
          </tr>
        </thead>

        <tbody>
          {[0, 1, 2, 3, 4, 5].map((week, index) => {
            return (
              <tr key={index}>
                {dayGridView
                  .slice(week === 0 ? week : week * 7, (week + 1) * 7)
                  .map((day, index) => {
                    const date = Object.values(day)[0];
                    const dayName = date.date
                      .toDateString()
                      .substring(0, 3)
                      .toLocaleLowerCase();
                    const events = date.events;

                    const virtualSessions = events.filter(
                      (oneEl) =>
                        oneEl.session.Type === 1 || oneEl.session.Type === 3
                    );
                    const physicalSessions = events.filter(
                      (oneEl) =>
                        oneEl.session.Type === 2 || oneEl.session.Type === 3
                    );

                    return (
                      <td
                        key={index}
                        {...(events.length === 0 && {
                          title: "No Events",
                        })}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "100%",
                            height: "100%",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",

                              ...(date.date.toLocaleDateString() === today && {
                                border: `2px solid blue`,
                              }),
                              borderRadius: "50%",
                              backgroundColor:
                                Object.values(day)[0].events.length > 0
                                  ? "lightblue"
                                  : "transparent",
                            }}
                            className={"day-with-events"}
                          >
                            <button
                              style={{
                                padding: "0px",
                                border: "none",
                                width: "100%",
                                height: "100%",
                                backgroundColor: "transparent",
                                ...(dayName === "sat" && {
                                  color: "#CA9416",
                                }),
                                ...(dayName === "sun" && {
                                  color: "blue",
                                }),
                              }}
                              className={` ${
                                events.length > 0 ? "pointer-hand" : ""
                              } `}
                              {...(events.length > 0 && {
                                onClick: () => {
                                  setSessions([...events]);
                                  setShowSessions(true);
                                },
                              })}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                              >
                                <p>{date.date.getDate()}</p>
                                {events.length > 0 && (
                                  <div
                                    style={{
                                      display: "flex",
                                      justifyContent: "center",
                                      alignItems: "center",
                                    }}
                                  >
                                    {virtualSessions.length > 0 && (
                                      <Dot
                                        color={COLOR_VIRTUAL_SESSIONS}
                                        title="Virtual sessions are available"
                                      />
                                    )}

                                    {physicalSessions.length > 0 && (
                                      <Dot
                                        color={COLOR_PHYSICAL_SESSIONS}
                                        title="Physical sessions are available"
                                      />
                                    )}
                                  </div>
                                )}
                              </div>
                            </button>
                          </div>
                        </div>
                      </td>
                    );
                  })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          my: { xs: 1, lg: 0.5 },
          mb: { lg: 0 },
        }}
      >
        <Dot
          color={COLOR_VIRTUAL_SESSIONS}
          title="Virtual sessions are available"
          sx={{ marginRight: "5px" }}
        />
        <Typography>Virtual Sessions</Typography>
        <Dot
          color={COLOR_PHYSICAL_SESSIONS}
          title="Physical sessions are available"
          sx={{ marginLeft: "10px", marginRight: "5px" }}
        />
        <Typography>Physical Sessions</Typography>
      </Box>
    </div>
  );
};

export default Calendar;
