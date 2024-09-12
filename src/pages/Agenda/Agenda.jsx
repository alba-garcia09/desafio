import React, { Fragment, useState } from "react";
import { Scheduler } from "@aldabil/react-scheduler";

const EVENTS = [
  {
    event_id: 1,
    title: "Event 1",
    start: new Date("2021 5 2 09:30"),
    end: new Date("2021 5 2 10:30"),
    admin_id: 1
  },
  {
    event_id: 2,
    title: "Event 2",
    start: new Date("2021 5 4 10:00"),
    end: new Date("2021 5 4 11:00"),
    admin_id: 2
  },
  {
    event_id: 3,
    title: "Event 3",
    start: new Date("2021 4 27 09:00"),
    end: new Date("2021 4 28 10:00"),
    admin_id: 1
  },
  {
    event_id: 4,
    title: "Event 4",
    start: new Date("2021 5 4 9:00"),
    end: new Date("2021 5 4 10:36"),
    admin_id: 2
  },
  {
    event_id: 5,
    title: "Event 5",
    start: new Date("2021 5 1 10:00"),
    end: new Date("2021 5 18 11:00"),
    admin_id: 4
  },
  {
    event_id: 6,
    title: "Event 6",
    start: new Date("2021 5 2 11:00"),
    end: new Date("2021 5 2 12:00"),
    admin_id: 2
  },
  {
    event_id: 7,
    title: "Event 7",
    start: new Date("2021 5 1 12:00"),
    end: new Date("2021 5 1 13:00"),
    admin_id: 3
  },
  {
    event_id: 8,
    title: "Event 8",
    start: new Date("2021 5 1 13:00"),
    end: new Date("2021 5 1 14:00"),
    admin_id: 4
  },
  {
    event_id: 9,
    title: "Event 11",
    start: new Date("2021 5 5 16:00"),
    end: new Date("2021 5 5 17:00"),
    admin_id: 1
  },
  {
    event_id: 10,
    title: "Event 9",
    start: new Date("2021 5 6  15:00"),
    end: new Date("2021 5 6 16:00"),
    admin_id: 2
  },
  {
    event_id: 11,
    title: "Event 10",
    start: new Date("2021 5 6 14:00"),
    end: new Date("2021 5 6 15:00"),
    admin_id: 1
  }
];

const RESOURCES = [
  {
    admin_id: 1,
    title: "John",
    mobile: "555666777",
    avatar: "https://picsum.photos/200/300",
    color: "#ab2d2d"
  },
  {
    admin_id: 2,
    title: "Sarah",
    mobile: "545678354",
    avatar: "https://picsum.photos/200/300",
    color: "#58ab2d"
  },
  {
    admin_id: 3,
    title: "Joseph",
    mobile: "543678433",
    avatar: "https://picsum.photos/200/300",
    color: "#a001a2"
  },
  {
    admin_id: 4,
    title: "Mera",
    mobile: "507487620",
    avatar: "https://picsum.photos/200/300",
    color: "#08c5bd"
  }
];


function Agenda() {
  const [mode, setMode] = useState("default"); // No es necesario especificar el tipo en JavaScript

  return (
    <Fragment>
      <div style={{ textAlign: "center" }}>
        <span>Resource View Mode: </span>
        <Button
          color={mode === "default" ? "primary" : "default"}
          variant={mode === "default" ? "contained" : "text"}
          size="small"
          onClick={() => setMode("default")}
        >
          Default
        </Button>
        <Button
          color={mode === "tabs" ? "primary" : "default"}
          variant={mode === "tabs" ? "contained" : "text"}
          size="small"
          onClick={() => setMode("tabs")}
        >
          Tabs
        </Button>
      </div>
      <Scheduler
        events={EVENTS}
        resources={RESOURCES}
        resourceFields={{
          idField: "admin_id",
          textField: "title",
          subTextField: "mobile",
          avatarField: "title",
          colorField: "color"
        }}
        resourceViewMode={mode}
        selectedDate={new Date(2021, 4, 2)}
        fields={[
          {
            name: "admin_id",
            type: "select",
            default: RESOURCES[0].admin_id,
            options: RESOURCES.map((res) => {
              return {
                id: res.admin_id,
                text: `${res.title} (${res.mobile})`,
                value: res.admin_id // Debería coincidir con la propiedad "name"
              };
            }),
            config: { label: "Assignee", required: true }
          }
        ]}
        viewerExtraComponent={(fields, event) => {
          return (
            <div>
              {fields.map((field, i) => {
                if (field.name === "admin_id") {
                  const admin = field.options.find(
                    (fe) => fe.id === event.admin_id
                  );
                  return (
                    <Typography
                      key={i}
                      style={{ display: "flex", alignItems: "center" }}
                      color="textSecondary"
                      variant="caption"
                      noWrap
                    >
                      <PersonRoundedIcon /> {admin.text}
                    </Typography>
                  );
                } else {
                  return null; // Mejor usar null en lugar de una cadena vacía
                }
              })}
            </div>
          );
        }}
      />
    </Fragment>
  );
}

export default Agenda;
