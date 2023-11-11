package ru.kata.spring.boot_security.demo;

import org.hibernate.Session;
import org.hibernate.engine.spi.SessionDelegatorBaseImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import ru.kata.spring.boot_security.demo.dao.RoleDao;
import ru.kata.spring.boot_security.demo.dao.UserDaoImpl;
import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.repositories.RoleRepositories;
import ru.kata.spring.boot_security.demo.repositories.UserRepositories;
import ru.kata.spring.boot_security.demo.services.UserServices;
import ru.kata.spring.boot_security.demo.services.UserServicesImpl;
import org.springframework.jdbc.core.JdbcTemplate;

import javax.annotation.PostConstruct;
import javax.persistence.EntityManager;
import javax.persistence.Query;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Map;

@SpringBootApplication
public class SpringBootSecurityDemoApplication {

    private UserServices userServices;

    UserRepositories userRepositories;

    RoleRepositories roleRepositories;

    public SpringBootSecurityDemoApplication(UserServices userServices, UserRepositories userRepositories, RoleRepositories roleRepositories) {
        this.userServices = userServices;
        this.userRepositories = userRepositories;
        this.roleRepositories = roleRepositories;
    }

    public static void main(String[] args) {
        SpringApplication.run(SpringBootSecurityDemoApplication.class, args);


    }

    @PostConstruct
    @Transactional
    public void init() throws SQLException, IOException {

        try {
            User userAdmin = new User();
            userAdmin.setUsername("admin");
            userAdmin.setPassword("$2y$12$l2zWFCq.q.AXpBk7srY9auv54oKD8L.Nbm1YSJqgyalUdIR0Roff2");
            userAdmin.setEmail("swqd@dqw.dwq");
            userAdmin.setFirstName("swqd");
            userAdmin.setLastName("swqd");

            Role roleAdmin = new Role();
            roleAdmin.setName("ROLE_ADMIN");
            Role roleUser = new Role();
            roleUser.setName("ROLE_USER");

            userAdmin.addRoleUser(roleAdmin);
            userAdmin.addRoleUser(roleUser);


            userServices.saveUser(userAdmin);

            User userUser = new User();
            userUser.setUsername("user");
            userUser.setPassword("$2y$12$U1GYRXr1SbC8oBg7zuX3YeEdxtpfCMZtq14d7P8GyNv6VWpb2Z6ge");
            userUser.setEmail("swqd@dqw.dwq");
            userUser.setFirstName("swqd");
            userUser.setLastName("swqd");


            userUser.addRoleUser(roleRepositories.findById(1).orElse(null));
            userServices.saveUser(userUser);
        } catch (Exception e) {
            e.printStackTrace();
        }

    }


}
