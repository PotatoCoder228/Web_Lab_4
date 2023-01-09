package ru.itmo.potatocoder228.lab4.web_lab_4.entities;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "t_user")

@Entity
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "login", length = 15)
    private String login;

    @Column(name = "password", nullable = false)
    private String password;

    public UserEntity(String login, String password) {
        this.login = login;
        this.password = password;
    }

}
