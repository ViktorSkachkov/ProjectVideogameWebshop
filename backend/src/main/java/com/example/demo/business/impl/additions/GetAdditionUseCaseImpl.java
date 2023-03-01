package com.example.demo.business.impl.additions;

import com.example.demo.business.cases.additions.GetAdditionUseCase;
import com.example.demo.domain.Addition;
import com.example.demo.domain.persistenceClasses.AdditionPersistence;
import com.example.demo.persistence.repositories.AdditionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class GetAdditionUseCaseImpl implements GetAdditionUseCase {
    private final AdditionRepository additionRepository;

    @Override
    public Addition GetAddition(int index) {
        Optional<AdditionPersistence> ap = additionRepository.findById(Long.valueOf(index));
        Addition addition = Addition.builder()
                .id(Math.toIntExact(ap.get().getId()))
                .image(ap.get().getImage())
                .name(ap.get().getName())
                .description(ap.get().getDescription())
                .price(ap.get().getPrice())
                .build();
        return addition;
    }
}
