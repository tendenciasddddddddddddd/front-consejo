import FullCalendar from "@fullcalendar/vue";
import dayGridPlugin from "@fullcalendar/daygrid";

export default {
  name: "Calendar",
  components: {
    FullCalendar,
  },
  data() {
    return {
      calendarOptions: {
        plugins: [dayGridPlugin],
        initialView: "dayGridMonth",
        eventClick: this.handleDateClick,
        selectable: true,
        events: [
          {
            title: "event 1 este es el mejor evento de la historia",
            date: "2022-01-01",
          },
          {
            title: "event 50 este es el mejor evento de la historia",
            date: "2022-01-01",
          },
          { title: "event 2", date: "2022-01-02" },
        ],
      },
    };
  },
  methods: {
    handleDateClick(arg) {
      this.$dialog.alert("Actividad," + arg.event.title);
    },
  },
};
