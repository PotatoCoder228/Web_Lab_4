package ru.itmo.potatocoder228.lab4.web_lab_4.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor//не забываем, что пустой конструктор обязателен
@Table(name = "hits_db")
@Entity
public class HitEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "x", nullable = false)
    private Double x;

    @Column(name = "y", nullable = false)
    private Double y;

    @Column(name = "r", nullable = false)
    private Double r;

    @Column(name = "hitResult", nullable = false)
    private String hitResult;

    @Column(name = "login", length = 15, nullable = false)
    private String login;

}
