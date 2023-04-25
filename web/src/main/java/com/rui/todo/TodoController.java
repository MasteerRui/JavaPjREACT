package com.rui.todo;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;


@RestController
@RequestMapping("/api")
@CrossOrigin
public class TodoController {
    @Autowired
    private TodoRepository todoRepository;

    @GetMapping("/")
    public List<Todo> GetTodos() {
        return todoRepository.findAll();
    }
    @GetMapping("/{id}")
    public Todo GetTodo(@PathVariable String id) {
        return todoRepository.findById(id).orElse(null);
    }
    @PostMapping("/")
    public Todo postMethodName(@RequestBody Todo todo) {
        return todoRepository.save(todo);
    }
    @PutMapping("/")
    public Todo PutMapping(@RequestBody Todo newTodo) {
        Todo oldTodo = todoRepository.findById(newTodo.getId()).orElse(null);
        oldTodo.setName(newTodo.getName());
        oldTodo.setDate(newTodo.getDate());
        oldTodo.setFeito(newTodo.getFeito());
        todoRepository.save(oldTodo);
        return oldTodo;
    }
    @DeleteMapping("/{id}")
    public String DeleteTodo(@PathVariable String id) {
        todoRepository.deleteById(id);
        return id;
    }
}