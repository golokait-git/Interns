package com.brajsundar.server.Model;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Users")
public class User {

    @Id
    private ObjectId id;

    @Indexed(unique = true)
    private String username;
    private String password;
    private String email;

    public String getId() {   
        return id.toHexString();
    }

    public void setId(ObjectId id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
    public boolean isPresent() {
        return this != null; // Simply check if the user object is not null
    }
    
    public User get() {
        return this; // Return the user object itself
    }
}
