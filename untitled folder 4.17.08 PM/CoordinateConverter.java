

public class CoordinateConverter {
    
    public static double convertXYtoR(double x, double y) {
        return Math.sqrt(x*x+y*y);
    }
    
    public static double convertXYtoT(double x, double y) {
        return Math.atan2(y,x);
    }
    
    public static double convertRTtoX(double r, double theta) {
        return Math.cos(theta)*r;
    }
    
    public static double convertRTtoY(double r, double theta) {
        return Math.sin(theta)*r;
    }
    
    public static double convertDegToRad(double deg) {
        return deg*Math.PI/180f;
    }
    
    public static double convertRadToDeg(double rad) {
        return rad*180f/Math.PI;
    }
    

}