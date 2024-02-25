export default class Time {
  static Init() {
    Time.date = new Date();
    Time.delta_time = 0;
    Time.current_time = Time.date.getTime() / 1000.0;
    Time.last_time = Time.current_time;
    Time.elapsed_time = 0;
  }

  static Update() {
    Time.date = new Date();
    Time.current_time = Time.date.getTime() / 1000.0;
    Time.delta_time = Time.current_time - Time.last_time;
    Time.elapsed_time += Time.delta_time;
    Time.last_time = Time.current_time;
  }
}
