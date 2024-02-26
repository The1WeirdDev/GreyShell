export default class Mathf{
    static Clamp(val, min, max){
        if(val < min)
            return min;
        else if(val > max)
            return max;

        return val;
    }
}