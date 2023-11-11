INSERT INTO `spring_3_1_3_security`.`users` (`email`, `name`, `last_name`, `username`,`password`) VALUES ('few@dwq.dwq', 'admin', 'admin', 'admin', '$2y$12$l2zWFCq.q.AXpBk7srY9auv54oKD8L.Nbm1YSJqgyalUdIR0Roff2');
INSERT INTO `spring_3_1_3_security`.`users` (`email`, `name`, `last_name`, `username`, `password`) VALUES ('few@dwq.dwq', 'user', 'user', 'user', '$2y$12$U1GYRXr1SbC8oBg7zuX3YeEdxtpfCMZtq14d7P8GyNv6VWpb2Z6ge');
INSERT INTO `spring_3_1_3_security`.`roles` (`name_role`) VALUES ('ROLE_USER');
INSERT INTO `spring_3_1_3_security`.`roles` (`name_role`) VALUES ('ROLE_ADMIN');
INSERT INTO `spring_3_1_3_security`.`users_roles` (`user_id`, `role_id`) VALUES ('1', '1');
INSERT INTO `spring_3_1_3_security`.`users_roles` (`user_id`, `role_id`) VALUES ('1', '2');
INSERT INTO `spring_3_1_3_security`.`users_roles` (`user_id`, `role_id`) VALUES ('2', '1');