package com.fpt.superapp.endtoend;

import org.springframework.web.bind.annotation.*;

import java.time.DateTimeException;
import java.time.LocalDate;

import static org.apache.commons.lang3.StringUtils.isNumeric;

@CrossOrigin(origins = "*") // hoặc cụ thể: "http://127.0.0.1:5500"
@RestController
@RequestMapping("/api")
public class DateController {

    @PostMapping("/validate-date")
    public DateResponse validateDate(@RequestBody DateRequest req) {
        if (!isNumeric(req.day) || !isNumeric(req.month) || !isNumeric(req.year)) {
            return new DateResponse(false, "❌ Invalid input: All fields must be numbers.");
        }

        int d = Integer.parseInt(req.day);
        int m = Integer.parseInt(req.month);
        int y = Integer.parseInt(req.year);

        if (d < 1 || d > 31 || m < 1 || m > 12 || y < 1000 || y > 3000) {
            return new DateResponse(false, "❌ Invalid input: Out of range.");
        }

        try {
            LocalDate date = LocalDate.of(y, m, d);
            return new DateResponse(true, "✅ Valid Date: " + d + "/" + m + "/" + y);
        } catch (DateTimeException e) {
            return new DateResponse(false, "❌ Invalid Date: " + d + "/" + m + "/" + y);
        }

    }
    private boolean isNumeric(String str) {
        return str != null && str.matches("\\d+");
    }

}

