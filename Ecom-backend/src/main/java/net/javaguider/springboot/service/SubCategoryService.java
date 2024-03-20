package net.javaguider.springboot.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import net.javaguider.springboot.exception.ResourceNotFoundException;
import net.javaguider.springboot.model.Category;
import net.javaguider.springboot.model.SubCategory;
import net.javaguider.springboot.payload.CategoryDto;
import net.javaguider.springboot.payload.SubCategoryDto;
import net.javaguider.springboot.repository.CategoryRepository;
import net.javaguider.springboot.repository.SubCategoryRepository;
@Service
public class SubCategoryService {
	
	
	
	
	@Autowired
    private SubCategoryRepository subCategoryRepository;
    private CategoryRepository categoryRepository;

    @Autowired
    private ModelMapper mapper;

    public SubCategoryService(SubCategoryRepository subCategoryRepository, CategoryRepository categoryRepository, ModelMapper mapper) {
        this.subCategoryRepository = subCategoryRepository;
        this.categoryRepository = categoryRepository;
        this.mapper = mapper;
    }
    
    

   
//    
//public SubCategoryDto create(SubCategoryDto dto,int catid) {
//		
//		
//		//categortDto to category
//		SubCategory subcat =this.mapper.map(dto, SubCategory.class);
//		SubCategory save = this.subCategoryRepository.save(subcat);
//		
//		//category to categoryDto
//		return this.mapper.map(save,SubCategoryDto.class);
//	}
    
    public SubCategoryDto create(SubCategoryDto dto, int categoryId) {
        // Map SubCategoryDto to SubCategory
        SubCategory subCategory = mapper.map(dto, SubCategory.class);
        
        // Set category ID for the subcategory
        Category category = new Category();
        category.setCategoryId(categoryId);
        subCategory.setCategory(category);
        
        // Save the subcategory
        SubCategory savedSubCategory = subCategoryRepository.save(subCategory);
        
        // Map SubCategory to SubCategoryDto
        return mapper.map(savedSubCategory, SubCategoryDto.class);
    }

//    @Transactional
//    public SubCategoryDto update(SubCategoryDto newSubCategory, int subCategoryId) {
//        SubCategory oldSubCategory = this.subCategoryRepository.findById(subCategoryId)
//                .orElseThrow(() -> new ResourceNotFoundException("Subcategory id is not present"));
//
//        oldSubCategory.setSubcatName(newSubCategory.getSubcatName());
//        Category category = categoryRepository.findById(newSubCategory.getCategoryDto().getCategoryId())
//                .orElseThrow(() -> new ResourceNotFoundException("Category not found"));
//        oldSubCategory.setCategory(category);
//
//        SubCategory updatedSubCategory = this.subCategoryRepository.save(oldSubCategory);
//        return this.mapper.map(updatedSubCategory, SubCategoryDto.class);
//    }

    public SubCategoryDto deleteSubCat(long subCategoryId) {
        SubCategory getByIdsubCategory = this.subCategoryRepository.findById(subCategoryId)
                .orElseThrow(() -> new ResourceNotFoundException("Subcategory id is not present"));
        return this.mapper.map(getByIdsubCategory, SubCategoryDto.class);
       
    }

    public SubCategoryDto getSubCatById(long subCategoryId) {
        SubCategory getById = this.subCategoryRepository.findById(subCategoryId)
                .orElseThrow(() -> new ResourceNotFoundException("Subcategory id is not present"));

        return this.mapper.map(getById, SubCategoryDto.class);
    }

    public List<SubCategoryDto> getAllSubCat() {
        List<SubCategory> findAll = this.subCategoryRepository.findAll();
        List<SubCategoryDto> allDto = findAll.stream().map(subCategory -> this.mapper.map(subCategory, SubCategoryDto.class)).collect(Collectors.toList());
        return allDto;
    }
}
