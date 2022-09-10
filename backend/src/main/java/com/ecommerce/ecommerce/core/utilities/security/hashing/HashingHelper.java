package com.ecommerce.ecommerce.core.utilities.security.hashing;

import org.springframework.security.crypto.bcrypt.BCrypt;

public class HashingHelper {

    private static String salt = BCrypt.gensalt();

    private HashingHelper() {
    }

    public static String createPassword(String password) {
        return BCrypt.hashpw(password, salt);
    }

    public static boolean verifyPassword(String password, String passwordHash) {
        if (BCrypt.checkpw(password, passwordHash)) {
            return true;
        }
        return false;
    }
}
