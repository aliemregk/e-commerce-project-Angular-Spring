package com.ecommerce.ecommerce.core.utilities.security.jwt.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class WebSecurityConfig {

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception {

        // TODO add security

        httpSecurity.csrf().disable();

        httpSecurity.headers().frameOptions().sameOrigin();

        return httpSecurity.build();
    }

    @Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
        return (web) -> web.ignoring().antMatchers("/images/**", "/js/**", "/webjars/**");
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration)
            throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }
}

/*
 * @Autowired
 * private JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
 * 
 * @Autowired
 * private UserDetailsService jwtUserDetailsService;
 * 
 * @Autowired
 * private JwtRequestFilter jwtRequestFilter;
 * 
 * @Autowired
 * private AuthenticationManager authenticationManager;
 * 
 * @Autowired
 * public void configureGlobal(AuthenticationManagerBuilder auth) throws
 * Exception {
 * // configure AuthenticationManager so that it knows from where to load
 * // user for matching credentials
 * // Use BCryptPasswordEncoder
 * auth.userDetailsService(jwtUserDetailsService).passwordEncoder(
 * passwordEncoder());
 * }
 * 
 * @Bean
 * public PasswordEncoder passwordEncoder() {
 * return new BCryptPasswordEncoder();
 * }
 * 
 * protected void configure(HttpSecurity httpSecurity) throws Exception {
 * // We don't need CSRF for this example
 * httpSecurity.csrf().disable()
 * // dont authenticate this particular request
 * .authorizeRequests().antMatchers("/authenticate").permitAll().
 * // all other requests need to be authenticated
 * anyRequest().authenticated().and().
 * // make sure we use stateless session; session won't be used to
 * // store user's state.
 * exceptionHandling().authenticationEntryPoint(jwtAuthenticationEntryPoint).and
 * ().sessionManagement()
 * .sessionCreationPolicy(SessionCreationPolicy.STATELESS);
 * 
 * // Add a filter to validate the tokens with every request
 * httpSecurity.addFilterBefore(jwtRequestFilter,
 * UsernamePasswordAuthenticationFilter.class);
 * }
 */

/*
 * authorizeRequests().antMatchers("/login")
 * .permitAll().antMatchers("/users/**", "/settings/**").hasAuthority("Admin")
 * .anyRequest().authenticated().and().formLogin().loginPage("/login")
 * .usernameParameter("email").permitAll().and()
 * .rememberMe().key("AbcdEfghIjklmNopQrsTuvXyz_0123456789").and().logout().
 * permitAll();
 */