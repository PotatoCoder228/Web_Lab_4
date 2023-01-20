package ru.itmo.potatocoder228.lab4.web_lab_4.dto;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class ResponseHitDto {
    private Double x;
    private Double y;
    private Double r;

    private String HitResult;
}
