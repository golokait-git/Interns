package net.javaguider.springboot.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import net.javaguider.springboot.exception.ResourceNotFoundException;
import net.javaguider.springboot.model.Category;
import net.javaguider.springboot.model.Seller;
import net.javaguider.springboot.payload.CategoryDto;
import net.javaguider.springboot.payload.SellerDto;
import net.javaguider.springboot.repository.CategoryRepository;
import net.javaguider.springboot.repository.SellerRepository;

@Service
public class SellerService {
	 @Autowired
	private  SellerRepository sellerRepo;
	  @Autowired
    public SellerService(SellerRepository sellerRepo  ,ModelMapper mapper) {
        this.sellerRepo = sellerRepo;
        this.mapper=mapper;
    }
	  
	@Autowired
	private ModelMapper mapper;
   public SellerDto create(SellerDto sellerdto) {
	
		//sellerDto to seller
		Seller seller =this.mapper.map(sellerdto, Seller.class);
		Seller  save = this.sellerRepo.save(seller);
		
		//seller to sellerDto
		return this.mapper.map(save,SellerDto.class);
	}
   //delete
   public void delete(long sellerid) {
       Seller seller = sellerRepo.findById(sellerid)
               .orElseThrow(() -> new ResourceNotFoundException("seller id is not present"));
       sellerRepo.delete(seller);
   }

   //seller get by id
   public SellerDto getById(long sellerid) {
		Seller getById = this.sellerRepo.findById(sellerid)
               .orElseThrow(() -> new ResourceNotFoundException("category id is not present"));

		
		return this.mapper.map(getById, SellerDto.class);
	}
   
   //get all seller
   public List<SellerDto> getAll(){
		List <Seller> findAll = this.sellerRepo.findAll();
		List<SellerDto> AllDto = findAll.stream().map(seller -> this.mapper.map(seller,SellerDto.class)).collect(Collectors.toList());
		return AllDto;
	}
	
}
