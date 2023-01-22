package ru.itmo.potatocoder228.lab4.web_lab_4.utils;

import lombok.Getter;
import lombok.Setter;
import ru.itmo.potatocoder228.lab4.web_lab_4.dto.HitDto;

@Getter
@Setter
public class AreaChecker {
    public boolean checkArea(HitDto hit) {
        final double x = Math.abs(hit.getX());
        final double y = hit.getY();
        final double XR = hit.getR();
        final double YR = hit.getR() / 2;
        return (x * x) / (XR * XR) + (y * y) / (YR * YR) <= 1 && !((x - XR / 3.5) * (x - XR / 3.5) / (XR * 0.15 * XR* 0.15) + (y - YR) * (y - YR) / (YR * 0.7 * YR * 0.7) <= 1 ||
                (x) * (x) / (XR * 0.1 * XR * 0.1) + (y - YR) * (y - YR) / (YR * 0.25 * YR * 0.25) <= 1 ||
                (x - XR / 7) * (x - XR / 7) / (XR / 7 * XR / 7) + (y + YR) * (y + YR) / (YR * 0.3 * YR * 0.3) <= 1 ||
                (x - XR / 3) * (x - XR / 3) / (XR / 7 * XR / 7) + (y + YR) * (y + YR) / (YR * 0.45 * YR * 0.45) <= 1);
    }
}
