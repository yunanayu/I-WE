package com.iandwe.essential.constant;

import com.iandwe.essential.domain.Essential;
import com.iandwe.essential.repository.EssentialRepository;

import java.util.List;

public enum EssentialSearchType {

    baby {
        @Override
        public List<Essential> findByTargetType(EssentialRepository essentialRepository, String target) {
            return essentialRepository.findByTarget(target);
        }
    },
    mother {
        @Override
        public List<Essential> findByTargetType(EssentialRepository essentialRepository, String target) {
            return essentialRepository.findByTarget(target);
        }
    },
    all {
        @Override
        public List<Essential> findByTargetType(EssentialRepository essentialRepository, String target) {
            return essentialRepository.findAll();
        }
    };

    public abstract List<Essential> findByTargetType(EssentialRepository essentialRepository, String target);
}
