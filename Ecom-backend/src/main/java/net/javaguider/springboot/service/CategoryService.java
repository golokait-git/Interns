package net.javaguider.springboot.service;

import java.util.List;

import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import net.javaguider.springboot.exception.ResourceNotFoundException;
import net.javaguider.springboot.model.Category;
import net.javaguider.springboot.payload.CategoryDto;
import net.javaguider.springboot.repository.CategoryRepository;
import net.javaguider.springboot.repository.SubCategoryRepository;
@Service
public class CategoryService {
	@Autowired
	private CategoryRepository catRepo;
	private SubCategoryRepository subCatRepo ;
	
	@Autowired
	private ModelMapper mapper;
	
    public CategoryService(CategoryRepository catRepo  ,ModelMapper mapper) {
        this.catRepo = catRepo;
        this.mapper=mapper;
    }

	public CategoryDto create(CategoryDto dto) {
		
		//categortDto to category
		Category cat =this.mapper.map(dto, Category.class);
		Category save = this.catRepo.save(cat);
		
		//category to categoryDto
		return this.mapper.map(save,CategoryDto.class);
	}
	
	  @Transactional
	public CategoryDto update(CategoryDto newcat, int catid) {
	    Category oldCate = this.catRepo.findById(catid)
	                                    .orElseThrow(() -> new ResourceNotFoundException("category id is not present"));
	    oldCate.setTitle(newcat.getTitle());
	    
	    
      Category updatedCategory = this.catRepo.save(oldCate);
        
        // Map the updated category entity to a CategoryDto and return it
      oldCate.setTitle(newcat.getTitle());
        return this.mapper.map(updatedCategory, CategoryDto.class);
        }

	 public void delete(int catid) {
	        Category category = catRepo.findById(catid)
	                .orElseThrow(() -> new ResourceNotFoundException("category id is not present"));
	        catRepo.delete(category);
	    }
	 
	 
	public CategoryDto getById(int catid) {
		 Category getById = this.catRepo.findById(catid)
                 .orElseThrow(() -> new ResourceNotFoundException("category id is not present"));

		
		return this.mapper.map(getById, CategoryDto.class);
	}
	
	public List<CategoryDto> getAll(){
		
		List <Category> findAll = this.catRepo.findAll();
		List<CategoryDto> AllDto = findAll.stream().map(cat -> this.mapper.map(cat,CategoryDto.class)).collect(Collectors.toList());
		return AllDto;
	}

}
