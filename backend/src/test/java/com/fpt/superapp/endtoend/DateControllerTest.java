package com.fpt.superapp.endtoend;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class DateControllerTest {

    private final DateController controller = new DateController();

    @Test
    void testValidLeapYearDate() {
        DateRequest req = new DateRequest();
        req.day = "29";
        req.month = "2";
        req.year = "2024";
        DateResponse res = controller.validateDate(req);
        assertTrue(res.valid);
        assertTrue(res.message.contains("Valid Date"));
    }

    @Test
    void testInvalidDate_Feb31() {
        DateRequest req = new DateRequest();
        req.day = "31";
        req.month = "2";
        req.year = "2023";
        DateResponse res = controller.validateDate(req);
        assertFalse(res.valid);
        assertTrue(res.message.contains("Invalid Date"));
    }

    @Test
    void testInvalidInput_NonNumeric() {
        DateRequest req = new DateRequest();
        req.day = "ab";
        req.month = "2";
        req.year = "2024";
        DateResponse res = controller.validateDate(req);
        assertFalse(res.valid);
        assertTrue(res.message.contains("All fields must be numbers"));
    }

    @Test
    void testInvalidInput_OutOfRangeDay() {
        DateRequest req = new DateRequest();
        req.day = "0";
        req.month = "8";
        req.year = "2023";
        DateResponse res = controller.validateDate(req);
        assertFalse(res.valid);
        assertTrue(res.message.contains("Out of range"));
    }

    @Test
    void testInvalidInput_OutOfRangeMonth() {
        DateRequest req = new DateRequest();
        req.day = "10";
        req.month = "13";
        req.year = "2023";
        DateResponse res = controller.validateDate(req);
        assertFalse(res.valid);
        assertTrue(res.message.contains("Out of range"));
    }

    @Test
    void testInvalidInput_YearBelow1000() {
        DateRequest req = new DateRequest();
        req.day = "10";
        req.month = "10";
        req.year = "999";
        DateResponse res = controller.validateDate(req);
        assertFalse(res.valid);
        assertTrue(res.message.contains("Out of range"));
    }

    @Test
    void testValidEndOfMonth() {
        DateRequest req = new DateRequest();
        req.day = "30";
        req.month = "4";
        req.year = "2023";
        DateResponse res = controller.validateDate(req);
        assertTrue(res.valid);
        assertTrue(res.message.contains("Valid Date"));
    }

    @Test
    void testInvalid31stApril() {
        DateRequest req = new DateRequest();
        req.day = "31";
        req.month = "4";
        req.year = "2023";
        DateResponse res = controller.validateDate(req);
        assertFalse(res.valid);
        assertTrue(res.message.contains("Invalid Date"));
    }
}