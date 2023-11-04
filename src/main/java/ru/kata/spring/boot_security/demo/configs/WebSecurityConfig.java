package ru.kata.spring.boot_security.demo.configs;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.JdbcUserDetailsManager;
import ru.kata.spring.boot_security.demo.services.UserServiseDetails;

import javax.sql.DataSource;


@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    private UserServiseDetails userServiseDetails;


    @Autowired
    public void setUserServiseDetails(UserServiseDetails userServiseDetails) {
        this.userServiseDetails = userServiseDetails;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests()
                .antMatchers("/user/**").authenticated()
                .antMatchers("/admin/**").hasRole("ADMIN")
                .and()
                .formLogin()
                .and()
                .formLogin().permitAll();
    }
    /*@Bean //In memory
    public UserDetailsService userDetailsService(){
        UserDetails userDetails = User.builder()
                .username("user")
                .password("{bcrypt}$2y$12$U1GYRXr1SbC8oBg7zuX3YeEdxtpfCMZtq14d7P8GyNv6VWpb2Z6ge")
                .roles("USER")
                .build();
        UserDetails admin = User.builder()
                .username("admin")
                .password("{bcrypt}$2y$12$U1GYRXr1SbC8oBg7zuX3YeEdxtpfCMZtq14d7P8GyNv6VWpb2Z6ge")
                .roles("ADMIN", "USER")
                .build();
        return new InMemoryUserDetailsManager(userDetails, admin);
    }*/
//  jdbsAuthentication
    /*//@Bean
    *//*public JdbcUserDetailsManager users(DataSource dataSource){
        UserDetails user = User.builder()
                .username("user")
                .password("{bcrypt}$2y$12$U1GYRXr1SbC8oBg7zuX3YeEdxtpfCMZtq14d7P8GyNv6VWpb2Z6ge")
                .roles("USER")
                .build();
        UserDetails admin = User.builder()
                .username("admin")
                .password("{bcrypt}$2y$12$U1GYRXr1SbC8oBg7zuX3YeEdxtpfCMZtq14d7P8GyNv6VWpb2Z6ge")
                .roles("ADMIN", "USER")
                .build();
        JdbcUserDetailsManager jdbcUserDetailsManager = new JdbcUserDetailsManager(dataSource);
        if (jdbcUserDetailsManager.userExists(user.getUsername()))
            jdbcUserDetailsManager.deleteUser(user.getUsername());
        if (jdbcUserDetailsManager.userExists(admin.getUsername()))
            jdbcUserDetailsManager.deleteUser(admin.getUsername());
        jdbcUserDetailsManager.createUser(user);
        jdbcUserDetailsManager.createUser(admin);
        return jdbcUserDetailsManager;
    }*/

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public DaoAuthenticationProvider daoAuthenticationProvider() {
        DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();
        authenticationProvider.setPasswordEncoder(passwordEncoder());
        authenticationProvider.setUserDetailsService(userServiseDetails);
        return authenticationProvider;
    }

}