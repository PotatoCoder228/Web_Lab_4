package ru.itmo.potatocoder228.lab4.web_lab_4.dto;

import lombok.*;


//DTO(Data Transfer Object) - прослойка между БД и данными, которыми мы манипулируем и можем отдать клиенту.
//Служит для того, чтобы ненужные столбцы из БД не попали к клиенту(хотя у нас таких нет, но паттерн лучше соблюдать).
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class AuthDto {
    private String login;
    private String password;
}
