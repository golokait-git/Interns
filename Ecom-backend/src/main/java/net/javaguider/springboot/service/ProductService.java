package net.javaguider.springboot.service;

import java.util.List;
import java.util.stream.Collectors;

import org.hibernate.mapping.Set;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import net.javaguider.springboot.exception.ResourceNotFoundException;
import net.javaguider.springboot.model.Category;
import net.javaguider.springboot.model.Product;
import net.javaguider.springboot.model.SubCategory;
import net.javaguider.springboot.payload.CategoryDto;
import net.javaguider.springboot.payload.ProductDto;
import net.javaguider.springboot.payload.SubCategoryDto;
import net.javaguider.springboot.repository.CategoryRepository;
import net.javaguider.springboot.repository.ProductRepository;
import net.javaguider.springboot.repository.SubCategoryRepository;
@Service
public class ProductService {
	@Autowired
	private ProductRepository productRepository;
	private CategoryRepository catRepo;
	private SubCategoryRepository subcatRepo;
	
	
	public ProductService (CategoryRepository catRepo,SubCategoryRepository subcatRepo) {
        this.catRepo = catRepo;
        this.subcatRepo=subcatRepo;
    }
	
	
	
//	public ProductDto saveProduct(ProductDto product,int catid) {
//		 
//	    Category cat = this.catRepo.findById(catid).orElseThrow(() -> new ResourceNotFoundException("This Category id not found Catgory "));
//
//	    // ProductDto to product entity
//	    Product productEntity = toEntity(product);
//	    productEntity.setCategory(cat);
//
//	    // Save the product entity
//	    Product savedProduct = this.productRepository.save(productEntity);
//
//	    // Convert the saved product entity to a ProductDto
//	    ProductDto dto = toDto(savedProduct);
//
//	    // Return the ProductDto
//	    return dto;
//	}
	
	
	 public ProductDto saveProduct(ProductDto product, int catid, int subcatid) {
		    Category cat = catRepo.findById(catid).orElseThrow(() -> new ResourceNotFoundException("Category with id " + catid + " not found"));
		    SubCategory subcat = subcatRepo.findById((long) subcatid).orElseThrow(() -> new ResourceNotFoundException("Subcategory with id " + subcatid + " not found"));

		    Product productEntity = toEntity(product);
		    productEntity.setCategory(cat);
		    productEntity.setSubCategory(subcat);

		    Product savedProduct = productRepository.save(productEntity);

		    return toDto(savedProduct);
		}

	
//get all product
	public List<ProductDto> getAllProducts() {
		//productDto to product
		List <Product> findAll=productRepository.findAll();
		List<ProductDto> findAllDto=findAll.stream().map(product -> this.toDto(product)).collect(Collectors.toList());
		return findAllDto;
	}


	
	//update product
	public ProductDto updateProduct(Long id, ProductDto productDto) {
	    Product existingProduct = productRepository.findById(id)
	            .orElseThrow(() -> new ResourceNotFoundException(+id+"from this product id product not found"));
	    existingProduct.setProductName(productDto.getProductName());
	    existingProduct.setPrice(productDto.getPrice());
	    existingProduct.setDescription(productDto.getDescription());
	    existingProduct.setStock(productDto.getStock());
//	    existingProduct.setCategory(productDto.getCategory());
//	    existingProduct.setSubCategory(productDto.getSubCategory());
	    existingProduct.setImgUrl(productDto.getImgUrl());

	    // Save existing product in the DB
	    Product savedProduct = productRepository.save(existingProduct);

	    return toDto(savedProduct);
	}

	


	//delete product
	public void deleteProduct(Long id) {
		 Product product = productRepository.findById(id).orElseThrow(() ->
                           new ResourceNotFoundException(+id+"from this product id product not found"));

           // Perform the deletion
            productRepository.delete(product);
		
	}

	
	//product get by id
	public ProductDto getProductById(Long id) {

		Product findById = productRepository.findById(id).orElseThrow(()-> 
		new ResourceNotFoundException(+id+"from this product id product not found"));
		
		ProductDto dto = this.toDto(findById);
		return dto;
	}
	
	
	
	//find product by category
	
	public List<ProductDto>findProductByCategory(int catid){
		
		
		
		Category cat=this.catRepo.findById(catid).orElseThrow(() ->
        new ResourceNotFoundException("This id Category not Found"));
		
		List<Product>findByCategory=this.productRepository.findByCategory(cat);
		List<ProductDto> collect =findByCategory.stream().map(product ->toDto(product)).collect(Collectors.toList());
		return collect;
	}

	
	public Product toEntity(ProductDto productDto) {
		
		Product p = new Product();
		p.setProductName(productDto.getProductName());
		p.setId(productDto.getId());
//		p.setCategory(productDto.getCategory());
		p.setDescription(productDto.getDescription());
		p.setImgUrl(productDto.getImgUrl());
		p.setPrice(productDto.getPrice());
		p.setStock(productDto.getStock());
//		p.setSubCategory(productDto.getSubCategory());
		
		return p;
		
	}
	


	


	
	public ProductDto toDto(Product product) {
	    ProductDto productDto = new ProductDto();
	    productDto.setId(product.getId());
	    productDto.setProductName(product.getProductName());
	    productDto.setDescription(product.getDescription());
	    productDto.setImgUrl(product.getImgUrl());
	    productDto.setPrice(product.getPrice());
	    productDto.setStock(product.getStock());

	    // Mapping CategoryDto
	    CategoryDto categoryDto = new CategoryDto();
	    categoryDto.setCategoryId(product.getCategory().getCategoryId());
	    categoryDto.setTitle(product.getCategory().getTitle());
	    productDto.setCategory(categoryDto);

	    // Mapping SubCategoryDto
	    SubCategory subCategory = product.getSubCategory();
	    if (subCategory != null) {
	        SubCategoryDto subCategoryDto = new SubCategoryDto();
	        subCategoryDto.setSubcateId(subCategory.getSubcateId());
	        subCategoryDto.setSubcatName(subCategory.getSubcatName());
	        
	        // Set subcategory's category information
	        CategoryDto subCategoryCategoryDto = new CategoryDto();
	        subCategoryCategoryDto.setCategoryId(subCategory.getCategory().getCategoryId());
	        subCategoryCategoryDto.setTitle(subCategory.getCategory().getTitle());
	        subCategoryDto.setCategoryDto(subCategoryCategoryDto);

	        productDto.setSubCategory(subCategoryDto);
	    }

	    return productDto;
	}

}
