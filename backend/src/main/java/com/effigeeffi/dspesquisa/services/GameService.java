package com.effigeeffi.dspesquisa.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.effigeeffi.dspesquisa.dto.GameDTO;
import com.effigeeffi.dspesquisa.entities.Game;
import com.effigeeffi.dspesquisa.repositories.GameRepository;

@Service
public class GameService {
	
	@Autowired
	private GameRepository repository;
	
	@Transactional(readOnly = true)
	public List<GameDTO> findAll() {
		List<Game> list = repository.findAll();
		return list.stream().map(item -> new GameDTO(item)).collect(Collectors.toList());
	}
}
