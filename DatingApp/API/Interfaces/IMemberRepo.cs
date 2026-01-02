
using API.Entities;

namespace API.Interfaces;

public interface IMemberRepo
{
    Task<IReadOnlyList<Member>> GetMembersAsync();
    Task<Member?> GetMemberByIdAsync(string id);
    void UpdateMember(Member member);
    Task<bool> SaveAllAsync();
    Task<IReadOnlyList<Photo>> GetPhotosByMemberIdAsync(string memberId);
    Task<Member?> GetMemberForUpdate(string id);
}
